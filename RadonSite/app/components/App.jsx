import React from 'react';
import Home from './Home.jsx';
import Determinism from './features/Determinism.jsx';
import Replayability from './features/Replayability.jsx';
import SuperstructuresIntro from './features/superstructures/Intro.jsx';
import SuperstructuresReferences from './features/superstructures/References.jsx';
import SuperstructuresReverting from './features/superstructures/Reverting.jsx';
import SuperstructuresSnapshots from './features/superstructures/Snapshots.jsx';
import SuperstructuresEffects from './features/superstructures/Effects.jsx';
import SuperstructuresComparing from './features/superstructures/Comparing.jsx';
import SuperstructuresConstraints from './features/superstructures/Constraints.jsx';
import SuperstructuresFunctions from './features/superstructures/Functions.jsx';
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
					  <Redirect exact={true} from="/features/superstructures" to="/features/superstructures/intro" />
			    	<Route path="/features/superstructures/intro" component={SuperstructuresIntro}/>
			    	<Route path="/features/superstructures/reverting" component={SuperstructuresReverting}/>
			    	<Route path="/features/superstructures/references" component={SuperstructuresReferences}/>
			    	<Route path="/features/superstructures/snapshots" component={SuperstructuresSnapshots}/>
			    	<Route path="/features/superstructures/effects" component={SuperstructuresEffects}/>
			    	<Route path="/features/superstructures/comparing" component={SuperstructuresComparing}/>
			    	<Route path="/features/superstructures/constraints" component={SuperstructuresConstraints}/>
			    	<Route path="/features/superstructures/functions" component={SuperstructuresFunctions}/>
			    	<Route path="/features/determinism" component={Determinism}/>
			    	<Route path="/features/replayability" component={Replayability}/>
			    	<Route path="/roadmap" component={Roadmap}/>
			    </Switch>
			  </Router>
	    </div>
   );
  }
}


export default App;
