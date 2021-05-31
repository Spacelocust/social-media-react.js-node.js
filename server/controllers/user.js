import mongo from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const { MongoClient } = mongo;

const connexionUser  = (client) => {
    return client.db("myFirstDatabase").collection("users");
}

export const signin = async (req, res) => {
    const client = new MongoClient(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });
    const { email, password } = req.body;

    try {
        await client.connect();
        const existingUser = await connexionUser(client).findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "l'utilisateur n'éxiste pas" });
        const checkPassword = bcrypt.compare(password, existingUser.password);

        if(!checkPassword) return res.status(400).json({ message: 'identifiants invalident'});
        const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue' });
    } finally {
        await client.close();
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, lastName, firstName } = req.body;
    const client = new MongoClient(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const existingUser = await connexionUser(client).findOne({ email });

        if (existingUser) return res.status(400).json({ message: "l'utilisateur éxiste déjà" });

        if(password !== confirmPassword) return res.status(400).json({ message: "Les mots de passe ne sont pas identiques" });

        const hashPassword = bcrypt.hash(password.toString(), 12);

        const result = await connexionUser(client).insertOne({ email: email, password: hashPassword, lastName: lastName, firstName: firstName, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ id: result.ops[0]._id, email: result.ops[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ result: result.ops[0], token });
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue' });
    } finally {
        await client.close();
    }
}
