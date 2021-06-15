import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId, setRefresh}) => {
    const dispatch = useDispatch();
    const defaultPost = { title: '', message: '', tags: '', selectedFiled: '', likes: [] }
    const [postData, setPostData] = useState(defaultPost);
    const post = useSelector((state) => currentId ? state.posts.find((p) => currentId === p._id) : null);
    const user = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')).result : null;
    const classes = useStyles();

    useEffect(() => {
            if (post) setPostData(post);
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            (async () => {
                await dispatch(updatePost(currentId, postData));
                setRefresh(true)
            })();
        } else {
            (async () => {
                await dispatch(createPost({ ...postData, name: user.name }));
                setRefresh(true)
            })();
        }

        clear();
    }

    const clear = () => {
        setPostData(defaultPost);
        setCurrentId(null);
    }

    if (user === null) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Veuillez-vous identifier pour crée ou aimer des posts
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? "Modifier" : "Ajouter"} un post</Typography>
                <TextField name="title" variant="outlined" label="Titre" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} multiline={true} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFiled: base64 })}/>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" size="large" color="primary" type="submit" fullWidth >valider</Button>
                <Button className={classes.buttonSubmit} variant="contained" size="small" color="secondary" fullWidth onClick={clear}>effacer</Button>
            </form>
        </Paper>
    );
}

export default Form;