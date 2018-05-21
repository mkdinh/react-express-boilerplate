process.env.PORT = 3002;
process.env.NODE_ENV = "test";

const supertest = require("supertest");
const chai = require("chai");
const mockgoose = require("./test_helpers/mockgoose");
const makeServer = require("./test_helpers/makeServer");
global.mockgoose = mockgoose;
global.expect = chai.expect;
global.request = supertest;
global.makeServer = makeServer;
