import React from 'react';
import '../../Tutorial.css';
import './Superstructures.css';
import Header from '../../Header.jsx';
import Footer from '../../Footer.jsx';
import {Link} from 'react-router-dom';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../../Note.jsx';
import SuperstructuresTOC from './SuperstructuresTOC.jsx';

const cssns = (classes) => "c-ssfunctions m-tutorial m-superstructures " + (classes || "");

const incode = (code) => <span className={cssns("inline-code")}>{code}</span>

class SuperstructuresFunctions extends React.Component {
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

                <h1 className={cssns("noline")}>Superstructures Guide: Functions</h1>

                <div className={cssns("content")}>
                  For simple operations, accessing superstructure data directly works well.
                </div>

                <div className={cssns("content")}>
                  For more complex operations, we should add <strong>superstructure functions</strong>.
                </div>

                <h3>Show me a Function!</h3>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content")}>
                      Let's make a simple function to add a moon with a random mass.
                    </div>
                    <div className={cssns("content")}>
                      Before that, let's talk about requirements for superstructure functions.
                    </div>
                    <div className={cssns("content")}>
                      First, their arguments can only be values <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="values"/> or members of the superstructure.
                    </div>
                    <div className={cssns("content")}>
                      Second, they must be <strong>deterministic</strong>. This means they cannot cannot access any globals, and they can't use any nondeterministic functions, such as {incode("cin.readLine")} and {incode("File.read")}.
                    </div>
                    <div className={cssns("content")}>
                      Unfortunately for us, {incode("Math.random")} is nondeterminstic, so we can't use it.
                    </div>
                    <div className={cssns("content")}>
                      However, pseudo-randomness (like the hash function on the right) is fine. It's random enough for our purposes. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="rand"/>
                    </div>

                <div className={cssns("content cozy")}>
                  We would call it like this:
                </div>

                <div className={cssns("content code end")}>
{`let saturn = &mySS.root.planets.1;
addMoonWithRandomMass(
  saturn, "Enceladus")`}
                </div>

                  </div>
                  <div className={cssns("half")}>
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
    name: Str;
    mass!: Int;
  }

  fn addMoonWithRandomMass(
      planet: &Planet,
      moonName: Str) {
    let mass = hash(moonName);
    planet.moons.append(
      Moon(name, mass));
  }

  fn hash(s: Str) {
    let chars = s.split("");
    let ints = chars..toInt();`} <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="map"/>{`
    ret ints.fold(0, +);`} <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="reducer"/>{`
  }
}`}
                    </div>
                  </div>
                </div>


                <h3>Constraints</h3>

                <div className={cssns("content cozy")}>
                  In the <Link to="/superstructures/constraints">Constraints</Link> page, we made a superstructure that enforced that planets were heavier than their moons. The following code would violate the constraint:
                </div>
                <div className={cssns("content code cozy")}>
{`let mySS =
  MySuperstructure(
    SolarSystem(
      List(Planet("Saturn", 999, List(Moon("Titan", 123))))));
mySS.root.planets.0.mass = 100;
mySS.root.planets.0.moons.0.mass = 50;`}
                </div>
                <div className={cssns("content")}>
                  The program halts when we set Saturn's mass to 100, because it checks constraints after that line.
                </div>

                <div className={cssns("content cozy")}>
                  We should instead wrap this in a superstructure function:
                </div>
                <div className={cssns("content code cozy")}>
{`superstructure MySuperstructure {
  ...

  fn setPlanetAndMoonMass(
      planet: &Planet, planetMass: Int,
      moon: &Moon, moonMass: Int) {
    planet.mass = planetMass;
    moon.mass = moonMass;
  }
}`}
                </div>
                <div className={cssns("content cozy")}>
                  And we would call it like so:
                </div>
                <div className={cssns("content code")}>
{`setPlanetAndMoonMass(&mySS.root.planets.0, 100, &mySS.root.planets.0.moons.0, 50);`}
                </div>

                <div className={cssns("content")}>
                  This works because constraints are checked after superstructure functions, not during.
                </div>

                <h3>References in Functions</h3>

                <div className={cssns("content")}>
                  In <Link to="/superstructures/references">References</Link>, we talked about how moving something out of a superstructure while there's still a strong reference to it will halt the program.
                </div>
                <div className={cssns("content")}>
                  Functions solve that, just how they solve the above constraints problem. References in a function are still considered part of the superstructure, albeit temporarily detached.
                </div>

                <div className={cssns("content")}>
                  The below is an example of a game's superstructure, with bases and tanks, where every tank must be at a base.
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`superstructure MySuperstructure {
  root struct Game {
    bases: List:Base;
    pilot: List:Pilot;
  }
  struct Base {
    name: Str;
    turrets: List:Turret;
  }
  struct Turret {
    name: Str;
  }
  struct Pilot {
    name: Str;
    turret: &Turret;
  }
}`}
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`let mySS =
  MySuperstructure(
    Game(
      List(
        Base(
          "Electria",
          List(
            Turret(
              "Shootybob")))),
        Base(
          "Valencia",
          List(
            Turret(
              "Badonkadonk")))),
      List()));
  let pilot =
    mySS.root.pilots.append(
      Pilot(
        "Raynor",
        &mySS.root.bases.0
          .turrets.0));`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content cozy")}>
                  Raynor is currently occupying Electria's "Shootybob" turret. We want to move Shootybob to Valencia:
                </div>
                <div className={cssns("content code cozy")}>
{`let shootybob = mySS.root.bases.0.turrets.remove(0);
mySS.root.bases.1.turrets.append(shootybob);`}
                </div>
                <div className={cssns("content")}>
                  But the program halts on the first line! This is because we just moved shootybob out of the superstructure while someone (Raynor) still had a strong reference to it. <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="disregard"/>
                </div>

                <div className={cssns("content cozy")}>
                  However, this works nicely if we put it inside a superstructure function:
                </div>
                <div className={cssns("content code cozy")}>
{`superstructure MySuperstructure {
  ...

  fn moveTurret(turret: &Turret, fromBase: &Base, toBase: &Base) {
    let turretOwningRef = fromBase.turrets.remove(fromBase.turrets.find(turret));
    toBase.turrets.append(turretOwningRef);
  }
}`}
                </div>
                <div className={cssns("content cozy")}>
                  And we would call it like so:
                </div>
                <div className={cssns("content code")}>
{`let shootybob = &mySS.root.bases.0.turrets.0;
moveTurret(shootybob, &mySS.root.bases.0, &mySS.root.bases.1);`}
                </div>

                <div className={cssns("content")}>
                  This works because variables inside a superstructure function are considered part of the superstructure, just temporarily detached.
                </div>

                <div className={cssns("content")}>
                  A good rule of thumb is that every modification of a superstructure should be done with a superstructure function.
                </div>

                <h3>Observing Calls</h3>

                <div className={cssns("content")}>
                  Much like how we can listen to effects that happen to the superstructure, we can listen for function calls.
                </div>

                <div className={cssns("content")}>
                  Using the earlier {incode("addMoonWithRandomMass")} example, let's see what observing calls is like:
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`superstructure MySuperstructure {
  ...

  fn addMoonWithRandomMass(
      planet: &Planet,
      moonName: Str) {
    let mass = hash(moonName);
    planet.moons.append(
      Moon(name, mass));
  }

  fn hash(s: Str) {
    let chars = s.split("");
    let ints = chars..toInt();
    ret ints.fold(0, +);
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
      "Saturn",
      999,
      List(Moon("Titan", 123))))));

mySS.addAfterRequestObserver(
  { doutln _; });

let saturn = &mySS.root.planets.1;
addMoonWithRandomMass(
  saturn, "Enceladus");`}
                    </div>
                  </div>
                </div>

                <div className={cssns("content cozy")}>
                  The above code outputs:
                </div>
                <div className={cssns("content code")}>
{`Call:addMoonWithRandomMass(3, "Enceladus");`}
                </div>

                <h3>The Call Struct</h3>

                <div className={cssns("content")}>
                  {incode("Call")} is a special struct template which represents a function call, it contains all of the arguments to the call. Think of it like {incode("Flat")} but for function arguments.
                </div>

                <div className={cssns("content splitter")}>
                  <div className={cssns("half")}>
                    <div className={cssns("content")}>
                      See right for what {incode("Call:addMoonWithRandomMass")} <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="funcarg"/> looks like.
                    </div>
                    <div className={cssns("content end")}>
                      Note how planet is an {incode("Int")} now instead of a {incode("&Planet")}.
                    </div>
                  </div>
                  <div className={cssns("half")}>
                    <div className={cssns("code")}>
{`struct Call:addMoonWithRandomMass {
  isa ICall;`} <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="isa"/>{`

  planet: Int;
  moonName: Str;
}`}
                    </div>
                  </div>
                </div>

                <div className={cssns("line")}/>

                <div className={cssns("content")}>
                  In the next page, we see the first time-traveling superstructure feature: Reverting.
                </div>

                <div className={cssns("content")} style={{textAlign: "right"}}>
                  <strong>Next:</strong> <a href="/superstructures/reverting">Reverting</a>
                </div>
              </div>
            </div>

            <div className={cssns("margin")}>
              <div className={cssns("toc-container")}>
                <SuperstructuresTOC page="functions"/>
                <div className={cssns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="bang">
                The {incode("!")} in {incode("mass!")} makes the field changeable; we can point it at a different {incode("Int")}.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="map">
                The {incode("..")} is the "map operator". {incode("..someFunc(2, 3)")} is equivalent to {incode(".map({someFunc(_, 2, 3)})")}.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="rand">
                Another common strategy is to store a "random seed" somewhere in the superstructure.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="reducer">
                This means, {incode("+")} all elements of {incode("ints")} together, starting with 0.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="values">
                Values are primitives like Int or Str, plus any user-defined value structs. See <Link to="/superstructures/basics">Basics</Link> for more.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="disregard">
                Disregard the obvious alternate solution of just moving it directly from one list to another, without putting it in a local variable first.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="funcarg">
                Note that we're using a function as a template argument here.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="isa">
                This means that this struct is a subclass of ICall.
              </Note>


{/*              
              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="reducer">
                Though, storing a file path as a string is fine, since that string won't change.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="note7">
                There are some additional rules for functions in a superstructure, check out the Functions section for those.
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

export default SuperstructuresFunctions;
