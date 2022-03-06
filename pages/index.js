import { Box } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import Button from '@mui/material/Button';

export const getServerSideProps = async () => {
    const catalogRes = await fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/categories')
    const catalog = await catalogRes.json()
    return {
        props: { catalog: catalog }
    }
}
const Home = ({ catalog }) => {
    return (
        <Box style={{ textAlign: 'center', flex: 1 }}>
            <Container>
                <Typography variant="h1" style={{ fontFamily: 'Lobster' }} >
                    Welcome To Blogger
                </Typography>

                <Typography style={{ fontFamily: 'Poppins' }}>
                    Blogger is where you can see and post blog anything you want can post here!!
                </Typography>
            </Container>
            <hr style={{ margin: '3rem 0' }} />
            <Typography variant="h2" style={{ fontFamily: 'Lobster' }} >
                Catagories
            </Typography>
            <Grid container spacing={1}>
                {catalog.map((item, index) => (
                    <Link as={'/Post'} href={{ pathname: '/Post', query: { id: index } }}>
                        <Grid item xs={12 / catalog.length}>

                            <Button >
                                <Typography variant='h1' style={{ fontFamily: 'Poppins', writingMode: 'vertical-rl', margin: "4rem" }}> {item.name}</Typography>
                            </Button>


                        </Grid>

                    </Link>
                ))
                }



            </Grid>
        </Box >
    );

}

export default Home;