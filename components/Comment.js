import * as React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import moment from 'moment'
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    overflowY: 'scroll',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    height: '90vh',
    width: '30vw',
    p: 4,
    borderRadius: '0.5rem',

};
const Comment = ({ postId }) => {
    const [name, setName] = React.useState('');
    const [comment, setComment] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const [commented, setCommented] = React.useState([]);

    // const [allComment, setAllComment] = React.useState(comments)

    React.useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/comments?post=' + postId)
            response = await response.json()
            setCommented(response)
        }

        fetchMyAPI()
    }, [commented])


    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCheckChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleSubmit = async () => {
        const response = await fetch('https://fswd-wp.devnss.com/wp-json/wp/v2/comments', {
            method: 'POST',
            body: JSON.stringify({ post: postId, author_name: name, content: comment, author_url: email }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ZnN3ZDpmc3dkLWNtcw==',
            }
        })
        const data = await response.json()
        console.log(data);
        if (!checked) {
            setComment('')
            setName('')
            setEmail('')
        }
        alert("Comment Submited")


    };
    // const commented = comments.filter(item => {
    //     return item.post === postId;

    // })
    return (<Box sx={style}>
        {commented.map(item => (<>
            {/* {console.log(postId)} */}
            <Link href={item.author_url} >
                <CardHeader
                    style={{ cursor: 'pointer' }}
                    avatar={
                        <Avatar src={Object.values(item.author_avatar_urls)[2]} aria-label="recipe" sx={{ width: 35, height: 35 }} />
                    }
                    title={
                        <Typography style={{ fontFamily: 'lobster', fontSize: '1.5rem' }}>{item.author_name}</Typography>

                    }
                    subheader={<Typography style={{ fontFamily: 'Poppins', fontSize: '0.9em' }}>{moment(item.date).format("LL")}</Typography>}
                />
            </Link>
            <Typography style={{ fontFamily: 'Poppins', padding: '0 2rem ' }} dangerouslySetInnerHTML={{ __html: item.content.rendered }} />
            <hr />
        </>
        ))}
        {commented.length < 1 ?
            <Typography style={{ fontFamily: 'Poppins', textAlign: 'center' }}>You are the first one here Comment anything!</Typography>
            : null}

        <TextField
            style={{
                margin: '0.5rem 0'
            }}
            id="outlined-name"
            label="Name"
            variant="standard"
            value={name}
            onChange={handleNameChange}
            color="warning"
        />
        <TextField
            error={comment == ''}
            id="outlined-comment"
            label="comment"
            variant="standard"
            value={comment}
            onChange={handleCommentChange}
            helperText={comment == '' ? 'Enter Comment' : ''}
            multiline
            fullWidth
            color="warning"
        />
        <TextField
            style={{
                margin: '0.5rem 0'
            }}
            id="outlined-comment"
            label="Email"
            variant="standard"
            value={email}
            onChange={handleEmailChange}
            multiline
            fullWidth
            color="warning"
        />
        {/* {console.log(arr)} */}
        <FormGroup>

            <Button disabled={comment == ''} variant="contained" color='warning' size='large' onClick={() => handleSubmit()}
                style={{
                    fontFamily: 'Poppins',
                    margin: '1rem 0',

                    padding: '0.2rem 1rem ',
                    borderRadius: '1rem',
                }}>Submit</Button>
            <FormControlLabel control={<Checkbox
                icon={<BookmarkBorderIcon />}
                checkedIcon={<BookmarkOutlinedIcon />}
                checked={checked}
                onChange={handleCheckChange}
                color='default'
            />} label={<Typography style={{ fontFamily: 'Poppins' }} >Save my name & Email</Typography>} />
        </FormGroup>

        {/* <Button onClick={() => }>push
        </Button> */}
        {/* {console.log(commented)} */}
        {/* {postId} */}
    </Box>);
}

export default Comment;