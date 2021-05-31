import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grid, Grow } from '@material-ui/core';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from '../../styles';
import { getPosts } from '../../actions/posts';

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());

        if (refresh) {
            setRefresh(false)
        }
    }, [refresh, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} setRefresh={setRefresh}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;
