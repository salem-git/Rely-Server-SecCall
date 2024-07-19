import express, { Request, Response } from 'express';

const app = express();

// const keyValueStore: { [key: string]: string } = {};

interface KeyValue {
  status: string;
  caller_phone_number: string;
  caller_name: string;
  receiver_phone_number:string;
  caller_publicKey: string;

}

const keyValueStore: {[key: string]: KeyValue} = {};

app.use(express.json());

app.post('/key-value', (req: Request, res: Response) => {
  // const { key, value } = req.body;
  // if (key && value) {
  //   keyValueStore[key] = value;
  //   res.status(201).json({ message: 'Key-value pair added successfully' });
  // } else {
  //   res.status(400).json({ error: 'Invalid key-value pair' });
  // }

  const { key, status, caller_phone_number,caller_name, receiver_phone_number,caller_publicKey} = req.body;
  if (key && status && caller_phone_number && caller_name && receiver_phone_number && caller_publicKey) {
    keyValueStore[key] = { status,caller_phone_number,caller_name, receiver_phone_number, caller_publicKey};
    res.status(201).json({ message: 'Key-value pair added successfully' });
  } else {
    res.status(400).json({ error: 'Invalid key-value pair' });
  }
});

app.get('/key-value/:key', (req: Request, res: Response) => {
  const key = req.params.key;
  if (keyValueStore[key]) {
    // res.status(200).json({ key, value: keyValueStore[key] });
    res.status(200).json({ key, ...keyValueStore[key] });
  } else {
    res.status(404).json({ error: 'Key not found' });
  }
});

app.delete('/key-value/:key', (req: Request, res: Response) => {
    const key = req.params.key;
    if (keyValueStore[key]) {
      delete keyValueStore[key];
      res.status(200).json({ message: 'Key deleted successfully! it is super simple' });
    } else {
      res.status(404).json({ error: 'Key not found' });
    }
});

const port = process.env.PORT || 3000; // Default to port 3000 if not specified
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
