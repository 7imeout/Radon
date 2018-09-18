import React from 'react';
import './Tutorial.css';
import './Superstructures.css';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {Link} from 'react-router-dom';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import SuperstructuresTOC from './SuperstructuresTOC.jsx';

const cssns = (classes) => "c-ssconstraints m-superstructures m-tutorial " + (classes || "");

const incode = (code) => <span className={cssns("inline-code")}>{code}</span>

class SuperstructuresConstraints extends React.Component {
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

                <h1 className={cssns("noline")}>Superstructures Guide: Constraints</h1>

                <div className={cssns("content")}>
                  To make sure a Radon superstructure always stays "sane", we can add <strong>constraints</strong> to it.
                </div>

                <div className={cssns("content")}>
                  "Sane" means something different to every superstructure. For example, if an airplane is made of parts, then the airplane's {incode("weight")} should always be the sum of its parts' {incode("weight")}. That rule is a <strong>constraint</strong>.
                </div>

                <div className={cssns("content")}>
                  When we violate our constraints, it means a bug has occurred.
                </div>

                <div className={cssns("content")}>
                  In Radon, we can express our constraints in code, and have our superstructure watch for when these bugs occur. This is incredibly useful in debugging and validation.
                </div>

                <h3>Adding a Constraint</h3>

                <div className={cssns("content")}>
                  In the <Link to="/superstructures/intro">intro</Link>, we made a superstructure that contained some planets and some moons.
                </div>
                <div className={cssns("content")}>
                  We'll add a "mass" property to both, and a constraint that checks that planets are always heavier than their moons.
                </div>

                <div className={cssns("content")}>
  <div className={cssns("code")}>
{`superstructure MySuperstructure {
  root struct SolarSystem {
    planets: List:Planet;
  }
  struct Planet {
    name: Str;
    mass!: Int;`} <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="bang"/>{`
    moons: List:Moon;
  }
  struct Moon {
    planet: &Planet;
    name: Str;
    mass!: Int;
  }

  constraint checkMass(Planet.mass, Moon.mass) {
    {(p: &Planet) p.moons.map({ _.mass < p.mass }).hasOnly(true)}
    {(m: &Moon) m.mass < m.planet.mass}
  }
}`}
  </div>
                </div>

                <div className={cssns("content")}>
                  A constraint is triggered when the specified fields changes, in this case, {incode("Planet.mass")} and {incode("Moon.mass")}.
                </div>

                <div className={cssns("content")}>
                  Depending on what changed, it will call one of the constraint's functions:
                  <ul className={cssns()}>
                    <li className={cssns()}>If we change a {incode("Planet.mass")}, then the function accepting a {incode("Planet")} is called.</li>
                    <li className={cssns()}>If we change a {incode("Moon.mass")}, then the function accepting a {incode("Moon")} is called.</li>
                  </ul>
                </div>

                <h3>Violating Constraints</h3>

                <div className={cssns("content cozy")}>
                  Now, let's see what happens when we try to violate this constraint:
                </div>

                <div className={cssns("content cozy")}>
  <div className={cssns("code")}>
{`let mySS =
  MySuperstructure(
    SolarSystem(
      List(Planet("Saturn", 1234, List(Moon("Titan", 9999999))))));`}
  </div>
                </div>

                <div className={cssns("content cozy")}>
                  The above code halts with this output:
                </div>

                <div className={cssns("content")}>
  <div className={cssns("code")}>
{`Violated constraint function checkMass(:&Planet):Bool!
(stack trace)`}
  </div>
                </div>

                <div className={cssns("content cozy")}>
                  Now, let's start with a good superstructure, and then afterwards violate the constraint later.
                </div>

                <div className={cssns("content cozy")}>
                  <div className={cssns("code")}>
{`let mySS =
  MySuperstructure(
    SolarSystem(
      List(Planet("Saturn", 600, List(Moon("Titan", 400))))));

mySS.root.planets.0.mass = 100;`}
                  </div>
                </div>

                <div className={cssns("content")}>
                  The above code halts with the same output.
                </div>

                <h3>Trying</h3>

                <div className={cssns("content cozy")}>
                  At runtime, we can attempt a modification, and instead of halting, the superstructure can revert back to its previous state:
                </div>

                <div className={cssns("content cozy")}>
  <div className={cssns("code")}>
{`let mySS =
  MySuperstructure(
    SolarSystem(
      List(Planet("Saturn", 600, List(Moon("Titan", 400))))));

let succeeded =
  mySS.try({
    mySS.root.planets.0.mass = 100;
  });

doutln succeeded;`}
  </div>
                </div>

                <div className={cssns("content")}>
                  The above code prints <strong>false</strong>, and the superstructure is unchanged.
                </div>

                <div className={cssns("line")}/>

                <div className={cssns("content")}>
                  In the next page, we see other kinds of references, including the <strong>strong reference</strong>, which is a kind of constraint.
                </div>

                <div className={cssns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/superstructures/references">References</a>
                </div>
              </div>
            </div>

            <div className={cssns("margin")}>
              <div className={cssns("toc-container")}>
                <SuperstructuresTOC page="constraints"/>
                <div className={cssns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="bang">
                The {incode("!")} in {incode("mass!")} makes the field changeable; we can point it at a different {incode("Int")}.
              </Note>
{/*
              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note1">
                <div>{incode("v.version")} is a built-in function.</div>
                <div>&nbsp;</div>
                <div>If we had {incode("using v;")} at the top of the file, then we could call {incode("version")} without the {incode("v.")} in front.</div>
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

export default SuperstructuresConstraints;
