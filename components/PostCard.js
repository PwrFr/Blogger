import * as React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import moment from 'moment'
import Link from 'next/link'
import Comment from './Comment';


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
const PostCard = ({ result, users }) => {
    const [expandedId, setExpandedId] = React.useState(-1);
    const [CommentId, setCommentId] = React.useState(-1);

    const handleCommentClick = (i) => {
        setCommentId(CommentId === i ? -1 : i);
    };

    const handleExpandClick = (i) => {
        setExpandedId(expandedId === i ? -1 : i);
    };
    return (
        <Container>

            <Grid container spacing={4} justifyContent="center">
                {result.map((item, i) => (
                    <Grid item xs={3} key={i} >
                        <Card style={{ boxShadow: '10px 15px  10px 0.2px  rgba(0, 0, 0, 0.1)' }}>
                            {users.map((user, index) => {
                                if (user.id == item.author) {
                                    return (
                                        <Link href={'/author/' + user.id} key={index}>
                                            <CardHeader
                                                style={{ cursor: "pointer" }}
                                                avatar={
                                                    <Avatar sx={{ bgcolor: red[500] }} src={Object.values(user.avatar_urls)[2]} aria-label="recipe" />
                                                }
                                                title={
                                                    <Typography style={{ fontFamily: 'lobster', fontSize: '1.5rem' }}>{user.name}</Typography>

                                                }
                                                subheader={<Typography style={{ fontFamily: 'Poppins', fontSize: '0.9em' }}>{moment(item.date).format("LL")}</Typography>}
                                            />
                                        </Link>
                                    )
                                }
                            })}

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
        </Container >
    );
}

export default PostCard;