import * as React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PostCard from '../components/PostCard'


export const getServerSideProps = async (context) => {
    const userRes = await fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/users')
    const user = await userRes.json()
    const postRes = await fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/posts')
    const post = await postRes.json()
    const catalogRes = await fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/categories')
    const catalog = await catalogRes.json()


    return {
        props: {
            posts: post,
            users: user,
            catalogs: catalog,
            catalogId: context.query.id == null ? 0 : context.query.id,
        }
    }
}

function TabPanel(props) {
    const { children, value, index, id, posts, users, ...other } = props;

    const result = posts.filter(item => {
        return item.categories.some(category => {
            return category === id;
        });
    })


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ margin: ' 1rem 0 ' }}
        >
            {value === index && (
                <PostCard result={result} users={users} />
            )
            }
        </div >
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const Post = ({ posts, users, catalogs, catalogId = 0, comments }) => {
    const [value, setValue] = React.useState(Number(catalogId));

    const handleChange = (event, newValue) => {
        console.log(event);
        setValue(newValue);

    };

    return (
        <Box style={{ flex: 1 }}>

            <Typography variant="h3" style={{ fontFamily: 'lobster', textAlign: 'center' }} >
                Post
                <Typography style={{ fontFamily: 'Poppins' }}>
                    You can see and read other works or posts here
                </Typography>
            </Typography>

            <Box sx={{ width: '100%' }}>

                <Box sx={{ width: '100%' }} >
                    <Tabs
                        value={value} onChange={handleChange}
                        TabIndicatorProps={{ style: { background: '#ee801e' } }} textColor="inherit" centered>
                        {catalogs.map((item, i) => (
                            <Tab label={item.name} style={{ fontFamily: 'Poppins' }} />

                        ))}

                    </Tabs>
                </Box>
                {catalogs.map((item, i) => (
                    <TabPanel value={value} index={i} posts={posts} users={users} id={item.id}>
                    </TabPanel>
                ))}
            </Box>


        </Box>
    );

}

export default Post;