const session = require('express-session');
var sess = {
  sessionId: null,
  session: null,
  userId: null,
  username: null,
  type: null,
};

var sessions=[];

const sessionDetails = {
  setSession(session) {
    //equivalent to sess = req.session
    sess.session = session;
    sess.sessionId = session.id;
  },
  sessionUserID(userId) {
    //equivalent to sess.userId = userId
    sess.userId = userId;
  },

  sessionUserType(type) {
    sess.type = type;

  },
  sessionUsername(username) {
    sess.username = username;
  },
  getSession(id) {
    const thisSession = sessions.filter(session => session.sessionId = id);
    return thisSession[0];
  },
  pushSession() {
    sessions.push(sess);
  },
  removeSession(id) {
    const thisSession = sessions.filter(session => !(session.sessionId = id));
    sessions = thisSession;

  }

}


const requireAuth = (req, res, next) => {
  const id = req.session.id;
  const thisSession = sessions.filter(session => session.sessionId = id);
  if (thisSession.length>0)
  next();
  else {
    res.status(401).json({ message: 'you did not login' })
  }
};


module.exports = { requireAuth, sess, sessionDetails };
