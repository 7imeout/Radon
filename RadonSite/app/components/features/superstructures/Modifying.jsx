import React from 'react';
import Header from '../../Header.jsx';
import Footer from '../../Footer.jsx';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../../Note.jsx';
import {Link} from 'react-router-dom';
import '../../Tutorial.css';
import './Superstructures.css';
import SuperstructuresTOC from './SuperstructuresTOC.jsx';

const cssns = (classes) => "c-ssmodifying m-tutorial m-superstructures " + (classes || "");

const incode = (code) => <span className={cssns("inline-code")}>{code}</span>

class SuperstructuresModifying extends React.Component {
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

                <h1 className={cssns("noline")}>Superstructures Guide: Modifying</h1>

                <div className={cssns("content")}>
                  In the <Link to="/superstructures/intro">intro</Link>, we made a superstructure that contained some planets and some moons, shown below. This page will explain how to modify the superstructure.
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
            Moon("Luna", 1737)))
        Planet(
          "Saturn",
          List(
            Moon("Titan", 2576),
            Moon("Mimas", 562))))));
 `}
                    </div>
                  </div>
                </div>

                <h3 className={cssns()}>Setting Fields</h3>

                <div className={cssns("content")}>
                  
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    Just as with regular Radon variables, fields' names must end in {incode("!")} to be modified. If we change {incode("Planet")}'s {incode("name")} field to {incode("name!")} then we can modify it.
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`struct Planet {
  name!: Str;
  moons: List:Moon;
}`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    Now, we can get a reference to it and modify its name.
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`let mySS = ...;
let saturn = &mySS.root.planets.1;
mut saturn.name! = "Flamscrankle";`}
                    </div>
                  </div>
                </div>


                <h3 className={cssns()}>Adding and Removing</h3>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="noteCollections"/>
                    {incode("List")} has a method called {incode("append")} which we can call to add new elements to the list.
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`mySS.root.planets.append(
  Planet("Bogglewog", List()));`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    We can also use {incode("List")}'s {incode("remove")} method to remove things.
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`mySS.root.planets.remove(
  &mySS.root.planets.2);`}
                    </div>
                  </div>
                </div>

                <div className={cssns("line")}/>

                <div className={cssns("content")}>
                  As we can see, there's nothing special here. We modify things inside superstructures the same way we modify things outside superstructures.
                </div>

                <div className={cssns("content")}>
                  Radon can take these simple modifications and do amazing things:
                  <ul className={cssns()}>
                    <li className={cssns()}>Notify observers of these modifications (see <Link to="/superstructures/effects">Effects</Link>).</li>
                    <li className={cssns()}>Remember these modifications for later reverting (see <Link to="/superstructures/reverting">Reverting</Link>).</li>
                  </ul>
                </div>

                <div className={cssns("content")}>
                  The next page explains how we can revert to past versions.
                </div>

                <div className={cssns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/superstructures/reverting">Reverting</a>
                </div>

              </div>

            </div>

            <div className={cssns("margin")}>

              <div className={cssns("toc-container")}>
                <SuperstructuresTOC page="modifying"/>
                <div className={cssns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="noteAnd">
                {incode("and")} makes a stream that pulls from two streams and closes when either of them closes.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="noteCollections">
                We can also use other collections like {incode("Map")}, {incode("Set")}, etc. See <Link to="/reference/colelctions">Collections</Link> for more.
              </Note>

            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default SuperstructuresModifying;
