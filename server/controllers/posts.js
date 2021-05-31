import mongo from 'mongodb';

const { MongoClient, ObjectID } = mongo;

const connexionPost  = (client) => {
   return client.db("myFirstDatabase").collection("postmessages");
}

// mongodb request
export const getPosts = async (req, res) => {
    const client = new MongoClient(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const postMessages = await connexionPost(client).find()
        const results = await postMessages.toArray();

        res.status(200).json(results);
    } catch (error) {
        res.status(404).json({ message: error.message });
    } finally {
        await client.close();
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const client = new MongoClient(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const result = await connexionPost(client).insertOne({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

        res.status(201).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    } finally {
        await client.close();
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    delete post["_id"]

    const client = new MongoClient(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const result = await connexionPost(client).updateOne({ _id: new ObjectID(id) }, { $set: post });

        res.status(201).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    } finally {
        await client.close();
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    const client = new MongoClient(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        await connexionPost(client).deleteOne({ _id: new ObjectID(id) });

        res.status(201).json("post effacé");
    } catch (error) {
        res.status(401).json({ message: error.message });
    } finally {
        await client.close();
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    const client = new MongoClient(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });

    if (!req.userId) return res.json({ message: 'Non authentifié'});

    try {
        await client.connect();

        const post = await connexionPost(client).findOne({ _id: new ObjectID(id) });

        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            post.likes.push(req.userId);
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost =  await connexionPost(client).updateOne({ _id: new ObjectID(id) }, { $set: post });
        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(401).json({ message: error.message });
    } finally {
        await client.close();
    }
}
