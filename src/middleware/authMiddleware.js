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
  },
  checkUserExistence(username) {
    const result = sessions.filter(session => session.username = username);
    return result.length >0
  },
  killUserSessions(userId) {
    //when the user logs out remove all their sessions
    sessions = sessions.filter(session => !(session.userId=userId));
  }

}


const requireAuth = (req, res, next) => {
  const id = req.session.id;
  const thisSession = sessions.filter(session => session.sessionId = id);
  if (thisSession.length>0)
  {
  //check if the cookie expired
  //i really wish i could do this in a more logical way, but we have no time...
  if(thisSession[0].session.cookie._expires < Date.now()) {
    //the session has expired. log the user out.
    //kill the JWT cookie
    const key = thisSession[0].username + 'jwt';
    res.clearCookie(key);
    //remove all the local user sessions
    sessionDetails.killUserSessions(thisSession[0].userId);
    return res.status(401).json({ message: 'you did not login' });
  }
  next();
  }
  else {
    res.status(401).json({ message: 'you did not login' })
  }
};


module.exports = { requireAuth, sess, sessionDetails };
