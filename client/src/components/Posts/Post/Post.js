import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardActions, CardMedia, Button, Typography } from '@material-ui/core';
import { Delete, MoreHoriz, ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons';
import moment from 'moment';
import 'moment/locale/fr';

import { deletePost, likePost, } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId, setRefresh }) => {
    moment.locale('fr');

    const classes = useStyles();
    const dispatch = useDispatch();
    const user = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')).result : null;

    const handleLike = () => {
        (async () => {
            await dispatch(likePost(post._id));
            setRefresh(true)
        })();
    }

    const Like = () => {
        if (post.likes) {
            return user && post.likes.find((id) => (id === (user.googleId || user._id)))
                ? (<React.Fragment>
                        <ThumbUpAlt fontSize="small" />&nbsp;{ post.likes.length } aimé
                    </React.Fragment>

                ) : (
                    <React.Fragment>
                        <ThumbUpAltOutlined fontSize="small" />&nbsp;{ post.likes.length }
                    </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <ThumbUpAltOutlined fontSize="small" />&nbsp;0
            </React.Fragment>
        );
    };

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFiled || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                {user && (post.creator === (user.googleId || user._id)) ?
                    <Button style={{ color: 'white' }} size="small"
                            onClick={() => setCurrentId(post._id)}>
                        <MoreHoriz fontSize="default"/>
                    </Button> : ""
                }
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags ? post.tags.map((t) => `#${t} `) : ""}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user} onClick={handleLike}>
                    <Like />
                </Button>
                {!user || (post.creator === (user.googleId || user._id)) ?
                    <Button size="small" color="primary"  onClick={() => dispatch(deletePost(post._id))}>
                        <Delete fontSize="small" /> Effacer
                    </Button> : ''
                }
            </CardActions>
        </Card>
    );
}

export default Post;