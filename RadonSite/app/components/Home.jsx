import React from 'react'
import './Home.css'
import Header from './Header.jsx'
import Playground from './Playground.jsx'
import Footer from './Footer.jsx';
import {Link} from 'react-router-dom';

const cssns = (classes) => "c-home " + (classes || "");

class Home extends React.Component {
  render() {
    return (
      <div className={cssns("root")}>
        <div className={cssns("headercontainer")}>
          <Header easterEgg={true}/>
        </div>

        <div className={cssns("page")}>

          <div className={cssns("wip")}>
            (Note: Radon is very much a work-in-progress. Blue links point to complete pages. See the <Link to="/roadmap">Roadmap</Link> for more!)
          </div>

          {/*<div className={cssns("description")}>
            Radon is a new general purpose programming language with a focus on <i>the bigger picture</i>. Read on to find out how!
          </div>*/}

          <div className={cssns("columns")}>

            <div className={cssns("left")}>
              <div className={cssns("featuring")}>
                <div className={cssns("featuring-title")}>Featuring:</div>
                <ul>
                  <li><Link to="/features/superstructures" className={cssns("feature-title")}>Superstructures</Link>: A simple, powerful paradigm for your application model.</li>
                  <li><Link to="/basics/types" className={cssns("feature-title incomplete")}>Statically Typed</Link>: Using type inference, structures, and interfaces.</li>
                  <li><Link to="/basics/ownership" className={cssns("feature-title incomplete")}>Ownership</Link>: Move semantics, strong references, and deterministic destruction.</li>
                  <li><Link to="/features/superstructures/reverting" className={cssns("feature-title")}>Time Travel</Link>: Fork, rewind, and compare versions of your superstructures.</li>
                  <li><Link to="/features/superstructures/constraints" className={cssns("feature-title")}>Constraints and Transactions</Link>: Bring relational consistency to the rest of your world.</li>
                  <li><Link to="/basics/functional" className={cssns("feature-title incomplete")}>Functional and Imperative</Link>: Code in the way you want!</li>
                  <li><Link to="/features/wingman" className={cssns("feature-title incomplete")}>Memory Safe</Link>: Using the wingman borrow checker.</li>
                  {/*<li className={cssns("notyet")}><Link to="/components" className={cssns("feature-title incomplete")}>Components</Link>: OO done right!</li>*/}
                  <li><Link to="/features/determinism" className={cssns("feature-title")}>Deterministic</Link>: Enforce that certain functions are deterministic!</li>
                  <li><Link to="/features/replayability" className={cssns("feature-title")}>Replayable</Link>: Replay your program to find bugs.</li>
                  {/*<li><Link to="/interoperability" className={cssns("feature-title incomplete")}>Interoperable</Link>: Compiles to native<span className={cssns("notyet")}>, JVM, and CLR</span>, and generates headers for C, C++, and Swift.</li>*/}
                  <li><Link to="/basics/syntax" className={cssns("feature-title incomplete")}>Sweet</Link>: Syntactic sugar like UFCS, polymorphic lambdas, and infix calling!</li>
                  <li><Link to="/features/virtualtemplates" className={cssns("feature-title incomplete")}>Virtual Templates</Link>: Closes the gap between run-time and compile-time polymorphism.</li>
                </ul>
              </div>

              <Playground/>
            </div>

            <div className={cssns("right")}>

              <div className={cssns("github")}>
                <a className={cssns("external-link")} href="https://github.com/7imeout/RadonC">Github Repository</a>
              </div>

              <div className={cssns("possibilities")}>
                <div className={cssns("possibilities-header")}>
                  <div className={cssns("possibilities-header-text")}>What's possible with Radon?</div>
                  <div className={cssns("possibilities-header-page-number")}>
                    <div className={cssns("possibilities-left")}></div>
                    <div className={cssns("possibilities-page possibilities-page-current")}></div>
                    <div className={cssns("possibilities-page")}></div>
                    <div className={cssns("possibilities-page")}></div>
                    <div className={cssns("possibilities-page")}></div>
                    <div className={cssns("possibilities-page")}></div>
                    <div className={cssns("possibilities-page")}></div>
                    <div className={cssns("possibilities-page")}></div>
                    <div className={cssns("possibilities-right")}></div>
                  </div>
                </div>

                <div className={cssns("possibilities-contents")}>
                  (stuff here)
                </div>
              </div>

              {/*<p>(video here)</p>*/}

            </div>
          </div>

          <Footer/>
        </div>
      </div>
    );
  }
}

export default Home;
