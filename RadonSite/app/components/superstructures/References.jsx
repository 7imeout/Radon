import React from 'react';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import {Link} from 'react-router-dom';
import ss1svg from './superstructures1.svg';
import ss2svg from './superstructures2.svg';
import './Tutorial.css';
import './Superstructures.css';
import SuperstructuresTOC from './SuperstructuresTOC.jsx';

const cssns = (classes) => "c-ssreferences m-tutorial m-superstructures " + (classes || "");

const incode = (code) => <span className={cssns("inline-code")}>{code}</span>

class SuperstructuresReferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.noteManager = new NoteManager(this);

    this.updateNoteAnchorPosition = (...args) => this.noteManager.updateNoteAnchorPosition(...args);
    this.updateNoteSize = (...args) => this.noteManager.updateNoteSize(...args);
    this.updateNotesHeaderRect = (...args) => this.noteManager.updateNotesHeaderRect(...args);
  }

  componentDidUpdate(prevProps, prevState) {
    this.noteManager.componentDidUpdate();
  }

  render() {
    return (
      <div className={cssns("root")}>
        <Header/>

        <div className={cssns("page")}>
          <div className={cssns("columns")}>

            <div className={cssns("left")}>

              <div className={cssns("main")}>

                <h1 className={cssns("noline")}>Superstructures Guide: References</h1>

                <div className={cssns("content")}>
                  In the <Link to="/superstructures/intro">intro</Link>, we made a superstructure that contained some planets and some moons, shown below. It contained only <strong>owning</strong> references. This page will show how we can add <strong>strong</strong> and <strong>weak</strong> references.
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`superstructure MySuperstructure {
  root struct SolarSystem {
    planets: List:Planet;
  }
  struct Planet {
    name: Str;
    moons: List:Moon;
  }
  struct Moon {
    name: Str;
    radius: Int;
  }
}`}
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`let mySS =
  MySuperstructure(
    SolarSystem(
      List(
        Planet(
          "Earth",
          List(
            Moon("Luna", 1737))),
        Planet(
          "Saturn",
          List(
            Moon("Titan", 2576),
            Moon("Mimas", 562))))));

`}
                    </div>
                  </div>
                </div>

                <h3 className={cssns()}>Owning References</h3>

                <img style={{float: "right", width: "342px", height: "208px"}} src={ss1svg}/>

                <div className={cssns("content")}>
                  Our superstructure so far only contains <strong>owning references</strong>.
                </div>

                <div className={cssns("content")}>
                  Superstructures' owning references follow the same rules as the rest of Radon: when the owning reference goes out of scope, the object is destroyed.
                </div>

                <div className={cssns("content")}>
                  Note that there <strong>cannot be ownership cycles</strong>. If X owns Y, Y can't own X.
                </div>

                <div className={cssns("content")}>
                  Keep in mind that anything indirectly owned by the root is part of the superstructure. Therefore, anything <strong>not</strong> indirectly owned by the root is <strong>not</strong> part of the superstructure.
                </div>

                <div className={cssns("content cozy")}>
                  For example, if we made a Moon, and didn't attach it to a superstructure...
                </div>

                <div className={cssns("content cozy code")}>
{`let m = Moon("Deimos", 6);`}
                </div>

                <div className={cssns("content cozy")}>
                  ...it is not yet part of the superstructure. We would have to attach it to an existing member of the superstructure:
                </div>

                <div className={cssns("content cozy code")}>
{`mySS.root.planets.0.moons.append(m);`}
                </div>

                <div style={{clear: "both"}}/>

                <h3 className={cssns()}>Strong References</h3>

                <div className={cssns("content")}>
                  Lets introduce some <strong>strong references</strong>. The below example adds an {incode("Astronaut")} class, with a strong reference to a planet.
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>

                    <div className={cssns("code")}>
{`superstructure MySuperstructure {
  root struct SolarSystem {
    planets: List:Planet;
    astronauts: List:Astronaut;
  }
  struct Planet {
    name: Str;
    moons: List:Moon;
  }
  struct Moon {
    name: Str;
    radius: Int;
  }
  struct Astronaut {
    name: Str;
    planet: &Planet;
  }
}`}
                    </div>
                  </div>
                  <div className={cssns("half")}>

                    <div className={cssns("code")}>
{`let mySS =
  MySuperstructure(
    SolarSystem(
      List(
        Planet(
          "Earth",
          List(
            Moon("Luna", 1737)))
        Planet(
          "Saturn",
          List(
            Moon("Titan", 2576),
            Moon("Mimas", 562)))),
      List()));

mySS.root.astronauts.add(
  Astronaut(
    "Raynor",
    &mySS.root.planets.1));`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content")}>
                  <img style={{float: "right", width: "251px", height: "317px", marginLeft: "8px"}} src={ss2svg}/>

                  The dashed line in the picture represents a strong reference.
                </div>

                <div className={cssns("content")}>
                  Remember that if we delete something that a strong reference is pointing to, the program will halt, similar to foreign key constraints in SQL.
                </div>

                <div className={cssns("content")}>
                  Strong references are slightly more strict inside superstructures than in the rest of Radon:
                </div>

                <div className={cssns("content")}>
                  <strong>A superstructure's strong references must only point only to things inside that superstructure.</strong>
                </div>

                <div className={cssns("content")}>
                  We couldn't make our Astronaut point to any arbitrary planet, it has to be a planet from {incode("mySS")}.
                </div>

                <div className={cssns("content cozy")}>
                  For example, moving Saturn out of the superstructure would cause the program to halt:
                </div>

                <div className={cssns("content code cozy")}>
{`let saturn = mySS.root.planets.1;`} <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="noteMove"/>
                </div>

                <div className={cssns("content")}>
                  Note the lack of an {incode("&")} (if we had an {incode("&")} then {incode("saturn")} would be a strong reference, not an owning one). Without the {incode("&")}, we just moved that planet out of the superstructure. Since the Astronaut was pointing at it, the program halted.
                </div>

                <div style={{clear: "both"}}/>

                <h3 className={cssns()}>Weak References</h3>

                <div className={cssns("content")}>
                  We can also have <strong>weak references</strong>. When something a weak reference is pointing at is destroyed, or moved out of the superstructure, the weak reference sets itself to null.
                </div>

                <div className={cssns("content cozy")}>
                  To change the {incode("planet")} field to a weak reference, we would use an {incode("&&")} instead of {incode("&")} for the {incode("planet")} field:
                </div>

                <div className={cssns("content cozy code")}>
{`struct Astronaut {
  name: Str;
  planet: &&Planet;
}`}
                </div>

                <div className={cssns("content cozy")}>
                  And we would use an {incode("&&")} instead of {incode("&")} to get a weak reference to Saturn:
                </div>

                <div className={cssns("content code")}>
{`mySS.root.astronauts.add(
  Astronaut(
    "Raynor",
    &&mySS.root.planets.1));`}
                </div>

                <div className={cssns("content cozy")}>
                  Similar to strong references, we must be careful when moving things out of a superstructure. This would set our Astronaut's {incode("planet")} reference to null:
                </div>

                <div className={cssns("content code cozy")}>
{`let saturn = mySS.root.planets.1;`}
                </div>

                <div className={cssns("content cozy")}>
                  Since we just moved saturn out of the superstructure, our Astronaut's {incode("planet")} field is now null. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="noteMove2"/>
                </div>

                <h3 className={cssns()}>Strong References Are Constraints</h3>

                <div className={cssns("content")}>
                  It's very important to recognize that every strong reference represents a constraint.
                </div>

                <div className={cssns("content")}>
                  One can think of a strong reference as a "weak reference with a constraint enforcing that it points somewhere".
                </div>

                <div className={cssns("content")}>
                  See <Link to="/superstructures/constraints">Constraints</Link> for more.
                </div>

                <div style={{clear: "both"}}/>

                <div className={cssns("line")}/>

                <div className={cssns("content")}>
                  In the next page, we learn about superstructure functions. Or, keep reading below to see how we can make references lazy.
                </div>

                <div className={cssns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/superstructures/functions">Functions</a>
                </div>

              </div>

            </div>

            <div className={cssns("margin")}>

              <div className={cssns("toc-container")}>
                <SuperstructuresTOC page="references"/>
                <div className={cssns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="noteMove">
                This does not apply to code inside <Link to="/superstructures/functions">superstructure functions</Link>; data inside superstructure functions are still considered "part of the superstructure", just temporarily detached.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="noteMove2">
                See <Link to="/superstructures/functions">Functions</Link> for how to much more easily move things around and in and out of superstructures.
              </Note>

{/*
              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note2">
                Radon's "ownership" concept is similar to C++'s {incode("std::unique_ptr")} or Rust's ownership.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="noteStrong">
                See <Link to="/basics">Basics</Link> for more on Owning, Strong, and Weak references.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note3">
                One can use a different name, but the root struct would need the {incode("root")} keyword in front.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note4">
                {incode("mySS.root.planets.1")} means the element at index 1. In other languages this might be {incode("mySS.root.planets[1]")}.
              </Note>
*/}
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default SuperstructuresReferences;
