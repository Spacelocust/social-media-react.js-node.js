import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    return (
        posts.length ? (
            <Grid className={classes.mainContainer} container alignItems={'stretch'} spacing={3}>
                {
                    posts.map((post, key) => (
                        <Grid key={`post-grid-${key}`} item xs={12} sm={6}>
                            <Post key={`post-${key}`} post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))
                }
            </Grid>
        ) : <CircularProgress />
    );
}

export default Posts;