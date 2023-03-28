const express = require('express');
const routers=express.Router();
const Usermodel=require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
