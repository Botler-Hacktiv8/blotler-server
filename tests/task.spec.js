const { ObjectID } = require('mongodb');
const request = require('supertest');
const chai = require('chai');  
const expect = chai.expect;

const { Task } = require('./../models/task');
const app = require('./../app');

const { dummyTask, dummyUser } = require('./seed');

/** remove all document before testing */
beforeEach((done) => {
  Task.remove({}).then(() => {
    return Task.insertMany(dummyTask);
  }).then(() => done());
});

describe('GET /api/tasks', () => {
  it('Get all tasks', (done) => {
    request(app)
      .get('/api/tasks')
      .set('x-auth', dummyUser[0].tokens[0].token)
      .expect(200)
      .expect((result) => {
        expect(result.body.status).to.equal('oke');
        expect(result.body.tasks.length).to.equal(2);
      })
      .end(done);
  });
  it ('Get all task with invalid token', (done) => {
    request(app)
      .get('/api/tasks')
      .set('x-auth', dummyUser[0].tokens[0].token + 'abc')
      .expect(401)
      .expect((result) => {
        expect(result.body.status).to.equal('unauthorized');
      })
      .end(done);
  })
});

describe('POST /api/tasks', () => {
  it('Create new Task', (done) => {
    const payload = {
      text: "This is the first tasks",
      timeStart: new Date(),
      timeEnd: new Date(),
      locationName: 'Pondok Indah Mall',
      address: 'Jalan Simatupang No. 1',
    }
    request(app)
      .post('/api/tasks')
      .set('x-auth', dummyUser[0].tokens[0].token)
      .send(payload)
      .expect(201)
      .expect((result) => {
        expect(result.body.status).to.equal('oke');
        expect(result.body.task.text).to.equal(payload.text);
      })
      .end((err, result) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
  it('Create Task with invalid data', (done) => {
    request(app)
      .post('/api/tasks')
      .set('x-auth', dummyUser[0].tokens[0].token)
      .send({})
      .expect(400)
      .expect((result) => {
        expect(result.body.status).to.equal('error');
      })
      .end((err, result) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

describe('GET /api/tasks/:id', () => {
  it('Get task by id', (done) => {
    const id = dummyTask[0]._id.toHexString();
    request(app)
      .get(`/api/tasks/${id}`)
      .set('x-auth', dummyUser[0].tokens[0].token)
      .expect(200)
      .expect((result) => {
        expect(result.body.status).to.equal('oke');
        expect(result.body.task.text).to.equal(dummyTask[0].text);
      })
      .end(done);
  })
  it('Return 404 if task not found', (done) => {
    const id = new ObjectID().toHexString();
    request(app)
      .get(`/api/tasks/${id}`)
      .set('x-auth', dummyUser[0].tokens[0].token)
      .expect(404)
      .expect((result) => {
        expect(result.body.status).to.equal('error');
      })
      .end(done);
  });
  it('Return 404 if invalid objectId', (done) => {
    request(app)
      .get(`/api/tasks/123`)
      .set('x-auth', dummyUser[0].tokens[0].token)
      .expect(404)
      .expect((result) => {
        expect(result.body.status).to.equal('error');
      })
      .end(done);
  });
});

describe('PATCH /api/tasks/:id', () => {
  it('Update text task', (done) => {
    const id = dummyTask[0]._id.toHexString();
    const text = 'updated text';
    request(app)
      .patch(`/api/tasks/${id}`)
      .set('x-auth', dummyUser[0].tokens[0].token)
      .send({ text })
      .expect(200)
      .expect((result) => {
        expect(result.body.status).to.equal('oke');
        expect(result.body.data.text).to.equal(text);
      }).end(done);
  });

  it('Update text with ivalid id', (done) => {
    const id = dummyTask[0]._id.toHexString() + 'abc';
    const text = 'updated text';
    request(app)
      .patch(`/api/tasks/${id}`)
      .set('x-auth', dummyUser[0].tokens[0].token)
      .send({ text })
      .expect(404)
      .expect((result) => {
        expect(result.body.status).to.equal('error');
      }).end(done);
  });
});

describe('DELETE /api/tasks/:id', () => {
  it('Remove task', (done) => {
    const id = dummyTask[1]._id.toHexString();
    request(app)
      .delete(`/api/tasks/${id}`)
      .set('x-auth', dummyUser[1].tokens[0].token)
      .expect(200)
      .expect((result) => {
        expect(result.body.task._id).to.equal(id);
      })
      .end((err, result) => {
        if (err) return done(err);
        Task.findById(id).then((todo) => {
          expect(todo).to.be.null;
          done();
        }).catch((e) => done(e));
      });
  });
  it('Remove Not Found', (done) => {
    const id = new ObjectID().toHexString();
    request(app)
      .delete(`/api/tasks/${id}`)
      .set('x-auth', dummyUser[1].tokens[0].token)
      .expect(404)
      .end(done);
  });
  it('Remove Invalid Object', (done) => {
    request(app)
      .delete(`/api/tasks/123`)
      .set('x-auth', dummyUser[1].tokens[0].token)
      .expect(404)
      .end(done);
  });
});