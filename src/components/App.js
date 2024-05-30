import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchDrivingSchools from './SearchDrivingSchools';
import BookLesson from './BookLesson';
import ManageProfile from './ManageProfile';
import LearningResources from './LearningResources';
import CommunityReviews from './CommunityReviews';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/search" component={SearchDrivingSchools} />
          <Route path="/book/:instructorId" component={BookLesson} />
          <Route path="/profile" component={ManageProfile} />
          <Route path="/resources" component={LearningResources} />
          <Route path="/community" component={CommunityReviews} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
