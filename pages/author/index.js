import { Box } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from 'next/link';

export const getServerSideProps = async () => {
    const userRes = await fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/users')
    const user = await userRes.json()
    return {
        props: { author: user }
    }
}

const Author = ({ author }) => {

    return (
        <>
            <Typography variant="h3" paddingY={3} style={{ fontFamily: 'lobster', textAlign: 'center' }} >
                Author
                <Typography style={{ fontFamily: 'Poppins' }}>
                    Author of posts are here you can see they profile
                </Typography>
            </Typography>
            <hr />
            <Container>
                <Grid container spacing={4} justifyContent="center" style={{ margin: '1rem 0' }}>
                    {author.map((item, index) => (
                        <Grid item xs={2} key={index} >
                            <Link href={'/author/' + item.id} >
                                <Card style={{ cursor: "pointer" }}>
                                    <CardMedia
                                        component="img"
                                        image={Object.values(item.avatar_urls)[2]}
                                        alt="profile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant='h4' style={{ fontFamily: 'lobster', textAlign: 'center', padding: 0, margin: 0 }}>
                                            {item.slug}
                                        </Typography>
                                    </CardContent>


                                </Card>
                            </Link>
                        </Grid>
                    ))

                    }


                </Grid>
            </Container>
        </>
    )
}

export default Author;