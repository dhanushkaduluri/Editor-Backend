// submissionController.js

import Submission from '../models/model.submission.js';
import axios from 'axios';

export const submit = async (req, res) => {
    try {
        const { username, language, stdin, code, output } = req.body;
        console.log(req.body);
        const newSubmission = new Submission({ username, language, stdin, code, output });
        await newSubmission.save();
        res.status(201).send('Submission received.');
    } catch (error) {
        console.error('Error submitting code:', error);
        res.status(500).json({ error: 'Failed to submit code' });
    }
};

export const getSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find().exec();
        res.json(submissions);
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({ error: 'Failed to fetch submissions' });
    }
};

export const checkOutput = async (req, res) => {
    const { token } = req.body;
    const option = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        params: {
            base64_encoded: 'true',
            fields: '*'
        },
        headers: {
            'X-RapidAPI-Key': '3e453a9771msh71ed0880a88bd5fp1d3ee6jsn620e339e78e2',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(option);
        const ans = atob(response.data.stdout);
        console.log("output : ", ans);
        res.json(ans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to check output' });
    }
}


export const executeCode = async (req, res) => {
    const { code, language } = req.body;
    const languages={
        python:71,
        java:91,
        cpp:49,
        javascript:93
    };

    console.log("language : ",languages[language]);

    const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';


    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
          base64_encoded: 'true',
          fields: '*'
        },
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': '3e453a9771msh71ed0880a88bd5fp1d3ee6jsn620e339e78e2',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
          language_id: languages[language],
          source_code: btoa(code),
          stdin: ''
        }
      };
      
      try {
          const response = await axios.request(options);
            res.json(response.data.token);
      } catch (error) {
          console.error(error);
      }
      
};
