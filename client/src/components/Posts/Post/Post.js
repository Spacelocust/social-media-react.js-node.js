import React from 'react';
import { Card, CardContent, CardActions, CardMedia, Button, Typography } from '@material-ui/core';
import { ThumbUpAlt, Delete, MoreHoriz } from '@material-ui/icons';
import moment from 'moment';

import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {

    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFiled} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHoriz fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags ? post.tags.map((t) => `#${t} `) : ""}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => {}}>
                    <ThumbUpAlt fontSize="small" />
                    Like
                    { post.likeCount }
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <Delete fontSize="small" />
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;