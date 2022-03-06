import * as React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import moment from 'moment'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SpeedDial from '@mui/material/SpeedDial';
import Link from 'next/link';
import WebIcon from '@mui/icons-material/Web';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LinkIcon from '@mui/icons-material/Link';
import Comment from '../../components/Comment';

export const getServerSideProps = async (context) => {
    const userRes = await fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/users/' + context.params.id)
    const user = await userRes.json()
    const postRes = await fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/posts')
    const post = await postRes.json()

    console.log();
    return {
        props: {
            author: user,
            posts: post.filter(item => item.author == context.params.id)
        }
    }
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    overflowY: 'scroll',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    height: '90vh',
    p: 4,
    borderRadius: '0.5rem',

};
const Detail = ({ author, posts }) => {
    const [expandedId, setExpandedId] = React.useState(-1);
    const [CommentId, setCommentId] = React.useState(-1);

    const handleCommentClick = (i) => {
        setCommentId(CommentId === i ? -1 : i);
    };

    const handleExpandClick = (i) => {
        setExpandedId(expandedId === i ? -1 : i);
    };
    return (
        <Box style={{
            flexDirection: "column",
            justifyContent: "center",
            display: "flex",
        }}>
            <Container>
                <Grid container justifyContent='space-between' direction="row" alignItems="center" paddingX={5}>
                    <Grid item>
                        <Typography variant="h1" style={{ fontFamily: 'Lobster' }} >
                            {author.slug}
                        </Typography>
                        <Typography variant="p" style={{ fontFamily: 'Poppins', fontSize: '1.5rem' }} >
                            {author.name}
                        </Typography>
                        <Typography style={{ fontFamily: 'Poppins' }}>
                            {author.description == "" ? author.name + ' didnt put any description here yet' : author.description}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <SpeedDial
                            ariaLabel="SpeedDial basic example"
                            icon={<Avatar src={Object.values(author.avatar_urls)[2]} aria-label="recipe" sx={{ width: 80, height: 80 }} />}
                            direction='left'
                        >

                            <SpeedDialAction
                                icon={<Link href={author.link}><LinkIcon /></Link>}
                                tooltipTitle={author.link}
                            />
                            {author.url == "" ? null : <SpeedDialAction
                                icon={<Link href={author.url}><WebIcon /></Link>}
                                tooltipTitle={author.url}
                            />}


                        </SpeedDial>


                    </Grid>
                </Grid>

                <hr />
                <Typography textAlign='center' paddingY={2} style={{ fontFamily: 'Poppins' }}>
                    Posts By {author.name}
                </Typography>
                <Box>
                    <Grid container spacing={4} justifyContent="center">
                        {posts.map((item, i) => (
                            <Grid item xs={3} key={i} >
                                <Card style={{ boxShadow: '10px 15px  10px 0.2px  rgba(0, 0, 0, 0.1)' }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar src={Object.values(author.avatar_urls)[2]} aria-label="recipe" />
                                        }
                                        title={
                                            <Typography style={{ fontFamily: 'lobster', fontSize: '1.5rem' }}>{author.name}</Typography>

                                        }
                                        subheader={<Typography style={{ fontFamily: 'Poppins', fontSize: '0.9em' }}>{moment(item.date).format("LL")}</Typography>}
                                    />


                                    <Typography style={{ fontFamily: 'Poppins', fontSize: '1.1rem', margin: '0 1rem', fontWeight: 'bold' }}>{item.title.rendered}</Typography>

                                    <CardContent sx={{ fontFamily: 'Poppins', }} dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />

                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}>
                                        <Button variant="contained" color='inherit' size='large' onClick={() => handleCommentClick(i)}
                                            style={{
                                                fontFamily: 'Poppins',
                                                margin: '1rem 1rem',
                                                padding: '0 0.5rem',
                                                borderRadius: '1rem',
                                            }}>Comments</Button>
                                        <Button variant="contained" color='inherit' size='large' onClick={() => handleExpandClick(i)}
                                            style={{
                                                fontFamily: 'Poppins',
                                                margin: '1rem 1rem',

                                                padding: '0 1rem ',
                                                borderRadius: '1rem',
                                            }}>Read More</Button>

                                    </Box>
                                    <Modal
                                        open={expandedId === i}
                                        onClose={() => handleExpandClick(i)}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography style={{ fontFamily: 'Poppins' }} dangerouslySetInnerHTML={{ __html: item.content.rendered }} />


                                        </Box>
                                    </Modal>
                                    <Modal
                                        open={CommentId === i}
                                        onClose={() => handleCommentClick(i)}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Comment postId={item.id} />
                                    </Modal>
                                </Card>
                            </Grid>

                        ))}
                    </Grid>
                </Box>

            </Container>
        </Box >
    );
}

export default Detail;