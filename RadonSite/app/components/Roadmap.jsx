import React from 'react'
import './Roadmap.css'
import Header from './Header.jsx'
import Playground from './Playground.jsx'
import Footer from './Footer.jsx';
import {Link} from 'react-router-dom';

const cssns = (classes) => "c-roadmap " + (classes || "");

class Roadmap extends React.Component {
  render() {
    return (
      <div className={cssns()}>
        <Header/>

        <div className={cssns("page")}>

          <div className={cssns("columns")}>
            <div className={cssns("left")}>
              <h1 className={cssns()}>Compiler Roadmap</h1>

              <h3 className={cssns()}>Short Term:</h3>

              <ul className={cssns()}>
                <li className={cssns()}>If Statements</li>
                <li className={cssns()}>Match Statements</li>
                <li className={cssns()}>Pattern Matching</li>
              </ul>

              <h3 className={cssns()}>Long Term:</h3>

              <ul className={cssns()}>
                <li className={cssns()}>Superstructures</li>
                <li className={cssns()}>Self-Hosted Compiler</li>
                <li className={cssns()}>JVM or CLR Cross-compilation</li>
                <li className={cssns()}>VS or IDEA Integration</li>
              </ul>

              <h3 className={cssns()}>Completed:</h3>

              <ul className={cssns()}>
                <li className={cssns()}>Abstract Functions (2018.05.17)</li>
                <li className={cssns()}>Virtual Functions</li>
                <li className={cssns()}>Templated Functions</li>
                <li className={cssns()}>Templated Structs</li>
                <li className={cssns()}>Lambdas</li>
                <li className={cssns()}>Type Inference</li>
                <li className={cssns()}>Structs</li>
                <li className={cssns()}>Function Definitions</li>
                <li className={cssns()}>Function Calls</li>
                <li className={cssns()}>Extern Calls</li>
                <li className={cssns()}>Booleans</li>
                <li className={cssns()}>Integers</li>
              </ul>

            </div>
            <div className={cssns("middle")}>

              <h1 className={cssns()}>Documentation Roadmap</h1>

              <h3 className={cssns()}>Short Term:</h3>

              <ul className={cssns()}>
                <li className={cssns()}>Superstructure Guide: Forking</li>
                <li className={cssns()}>Superstructure Guide: Performance</li>
                <li className={cssns()}>Superstructure Guide: Superstructure Zen</li>
                <li className={cssns()}>"Basics" Pages (with Statically Typed and Ownership)</li>
                <li className={cssns()}>Perfect Merging</li>
              </ul>

              <h3 className={cssns()}>Completed:</h3>

              <ul className={cssns()}>
                <li className={cssns()}>Superstructure Guide: Comparing (2018.06.10)</li>
                <li className={cssns()}>Superstructure Guide: Snapshots</li>
                <li className={cssns()}>Superstructure Guide: Reverting</li>
                <li className={cssns()}>Superstructure Guide: Functions</li>
                <li className={cssns()}>Superstructure Guide: References</li>
                <li className={cssns()}>Superstructure Guide: Constraints</li>
                <li className={cssns()}>Superstructure Guide: Effects</li>
                <li className={cssns()}>Superstructure Guide: Intro</li>
                <li className={cssns()}>Roadmap</li>
                <li className={cssns()}>Home</li>
              </ul>

            </div>
            <div className={cssns("right")}>

              <h1 className={cssns()}>Other Aspects' Roadmap</h1>

              <h3 className={cssns()}>Long Term:</h3>

              <ul className={cssns()}>
              </ul>

              <h3 className={cssns()}>Completed:</h3>

              <ul className={cssns()}>
              </ul>

            </div>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default Roadmap;
