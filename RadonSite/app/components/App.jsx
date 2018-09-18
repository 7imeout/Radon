import React from 'react';
import Home from './Home.jsx';
import SuperstructuresIntro from './superstructures/Intro.jsx';
import SuperstructuresReferences from './superstructures/References.jsx';
import SuperstructuresReverting from './superstructures/Reverting.jsx';
import SuperstructuresSnapshots from './superstructures/Snapshots.jsx';
import SuperstructuresEffects from './superstructures/Effects.jsx';
import SuperstructuresComparing from './superstructures/Comparing.jsx';
import SuperstructuresConstraints from './superstructures/Constraints.jsx';
import SuperstructuresFunctions from './superstructures/Functions.jsx';
import Roadmap from './Roadmap.jsx';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

  render() {
  	return (
	    <div>
	    	<Router>
			    <Switch>
			    	<Route exact={true} path="/" component={Home}/>
					  <Redirect exact={true} from="/superstructures" to="/superstructures/intro" />
			    	<Route path="/superstructures/intro" component={SuperstructuresIntro}/>
			    	<Route path="/superstructures/reverting" component={SuperstructuresReverting}/>
			    	<Route path="/superstructures/references" component={SuperstructuresReferences}/>
			    	<Route path="/superstructures/snapshots" component={SuperstructuresSnapshots}/>
			    	<Route path="/superstructures/effects" component={SuperstructuresEffects}/>
			    	<Route path="/superstructures/comparing" component={SuperstructuresComparing}/>
			    	<Route path="/superstructures/constraints" component={SuperstructuresConstraints}/>
			    	<Route path="/superstructures/functions" component={SuperstructuresFunctions}/>
			    	<Route path="/roadmap" component={Roadmap}/>
			    </Switch>
			  </Router>
	    </div>
   );
  }
}


export default App;
