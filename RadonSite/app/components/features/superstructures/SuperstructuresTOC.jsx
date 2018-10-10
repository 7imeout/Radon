import React from 'react';
import './SuperstructuresTOC.css';
import {Link} from 'react-router-dom';

const cssns = (classes) => "c-superstructurestoc " + (classes || "");

class SuperstructuresTOC extends React.Component {
  render() {

    let sectionsByPage = {
      "intro": <Link to="/superstructures/intro">Introduction</Link>,
      "references": <Link to="/superstructures/references">References</Link>,
      "reverting": <Link to="/superstructures/reverting">Reverting</Link>,
      "snapshots": <Link to="/superstructures/snapshots">Snapshots</Link>,
      "effects": <Link to="/superstructures/effects">Effects</Link>,
      "comparing": <Link to="/superstructures/comparing">Comparing</Link>,
      "forking": <Link to="/superstructures/forking">Forking</Link>,
      "constraints": <Link to="/superstructures/constraints">Constraints</Link>,
      "functions": <Link to="/superstructures/functions">Functions</Link>,
      "synchronization": <Link to="/superstructures/synchronization">Synchronization</Link>,
    };

    let page = this.props.page;
    if (page == "intro") {
      sectionsByPage["intro"] = (
        <div>
          <strong>Introduction *</strong>
          <ul className={cssns()}>
            <li className={cssns()}>What's a superstructure?</li>
            <li className={cssns()}>Reading a Superstructure</li>
            <li className={cssns()}>Requesting a Superstructure</li>
          </ul>
        </div>
      );
    }
    if (page == "references") {
      sectionsByPage["references"] = (
        <div>
          <strong>References *</strong>
          <ul className={cssns()}>
            <li className={cssns()}>Owning References</li>
            <li className={cssns()}>Strong References</li>
            <li className={cssns()}>Weak References</li>
            <li className={cssns()}>Strong References Are Constraints</li>
            <li className={cssns()}>Lazy References</li>
          </ul>
        </div>
      );
    }
    if (page == "reverting") {
      sectionsByPage["reverting"] = (
        <div>
          <strong>Reverting *</strong>
          <ul className={cssns()}>
            <li className={cssns()}>Enabling Reverting</li>
            <li className={cssns()}>Using It</li>
            <li className={cssns()}>What can we use reverting for?</li>
            <li className={cssns()}>Keep in mind...</li>
          </ul>
        </div>
      );
    }
    if (page == "snapshots") {
      sectionsByPage["snapshots"] = (
        <div>
          <strong>Snapshots *</strong>
          <ul className={cssns()}>
            <li className={cssns()}>What can we use snapshots for?</li>
            <li className={cssns()}>Snapshotting in Action</li>
            <li className={cssns()}>Keep in mind...</li>
          </ul>
        </div>
      );
    }
    if (page == "effects") {
      sectionsByPage["effects"] = (
        <div>
          <strong>Effects *</strong>
          <ul className={cssns()}>
            <li className={cssns()}>Listening for Effects</li>
            <li className={cssns()}>Anatomy of an Effect</li>
            <li className={cssns()}>What can we use effects for?</li>
            <li className={cssns()}>Keep in mind...</li>
          </ul>
        </div>
      );
    }
    if (page == "comparing") {
      sectionsByPage["comparing"] = (
        <div>
          <strong>Comparing *</strong>
          <ul className={cssns()}>
            <li className={cssns()}>What can comparing be used for?</li>
            <li className={cssns()}>Comparing in Action</li>
            <li className={cssns()}>The Diff Struct</li>
            <li className={cssns()}>Diff Options</li>
          </ul>
        </div>
      );
    }
    if (page == "constraints") {
      sectionsByPage["constraints"] = (
        <div>
          <strong>Constraints *</strong>
          <ul className={cssns()}>
            <li className={cssns()}>Adding a Constraint</li>
            <li className={cssns()}>Violating Constraints</li>
            <li className={cssns()}>Trying</li>
          </ul>
        </div>
      );
    }
    if (page == "functions") {
      sectionsByPage["functions"] = (
        <div>
          <strong>Functions *</strong>
          <ul className={cssns()}>
            <li className={cssns()}>Show me a Function!</li>
            <li className={cssns()}>Constraints</li>
            <li className={cssns()}>References in Functions</li>
            <li className={cssns()}>Observing Calls</li>
            <li className={cssns()}>Sending Requests</li>
          </ul>
        </div>
      );
    }

    


    return (
      <div className={cssns("root")}>
        Superstructures
        <ul className={cssns()}>
          <li className={cssns()}>{sectionsByPage["intro"]}</li>
          <li className={cssns()}>{sectionsByPage["effects"]}</li>
          <li className={cssns()}>{sectionsByPage["constraints"]}</li>
          <li className={cssns()}>{sectionsByPage["references"]}</li>
          <li className={cssns()}>{sectionsByPage["functions"]}</li>
          <li className={cssns()}>{sectionsByPage["reverting"]}</li>
          <li className={cssns()}>{sectionsByPage["snapshots"]}</li>
          <li className={cssns()}>{sectionsByPage["comparing"]}</li>
        </ul>
      </div>

    );
    // <li className={cssns()}>{sectionsByPage["forking"]}</li>
  }
}

export default SuperstructuresTOC;
