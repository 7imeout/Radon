import React from 'react';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../Note.jsx';
import {Link} from 'react-router-dom';
import '../Tutorial.css';

const cssns = (classes) => "c-ssintro m-tutorial m-superstructures " + (classes || "");

const incode = (code) => <span className={cssns("inline-code")}>{code}</span>

class Replayability extends React.Component {
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

                <h1 className={cssns("noline")}>Replayability</h1>
                <div className={cssns("content cozy")}>
                  With Radon, you can record an execution and replay it.
                </div>
                <div className={cssns("content cozy")}>
                  To do this, pass the --recordable flag to the compiler, which will instrument the program <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="noteInstrument"/> so that all of its nondeterministic operations <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="noteNondops"/> (such as getting keyboard input) are replaced with writes to, or reads from, a file.
                </div>
                <div className={cssns("content cozy")}>
                  When actually running the program, pass --recordto="filenamehere.ses" to record this run, or --replayfrom="filenamehere.ses" to replay a file.
                </div>

                <h3 className={cssns()}>What is This For?</h3>
                <div className={cssns("content cozy")}>
                  With a session recorded, a developer can step through a run which crashed, and see exactly what led up to the crash.
                </div>
                <div className={cssns("content cozy")}>
                  This is incredibly useful for development, and for testers. In the right circumstances, this can even be useful for production.
                </div>
                <div className={cssns("content cozy")}>
                  <strong>Development:</strong> One should always record their runs in development, because that's when we find the most bugs. If your program crashes, just open your favorite debugger, pass the --replayfrom flag, and watch as it makes your program do the exact same thing it did before.
                </div>
                <div className={cssns("content cozy")}>
                  <strong>Testers:</strong> When you give the program to your testers (whether they be in-house or external beta testers), enable recording. When they find a bug and you ask "How did you make that happen?", you can just get their session file instead of having them explain to you the steps they remember and hoping you can reproduce the problem.
                </div>
                <div className={cssns("content cozy")}>
                  <strong>Production:</strong> In the right circumstances, this can even be used in production builds. One might want to enable replaying only for certain threads, with the --discardsuccess option. See the Capabilities for more.
                </div>

                <h3 className={cssns()}>Capabilities</h3>
                <div className={cssns("content cozy")}>
                  <ul className={cssns("cozy")}>
                    <li className={cssns()}><strong>Thread Filters:</strong> One can enable replaying for specific threads <NoteAnchor colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteAnchorPosition} name="noteMessages"/>, by specifying the --recordthreads flag, for example --recordthreads="UIThread,MyOtherThread". Note that this will also record any threads that this thread spawns.</li>
                    <li className={cssns()}><strong>Discard Success or Failure:</strong> We can automatically discard the session file if the program or thread completes successfully, with the --discardsuccess flag. We can also discard when it fails, with the --discardfailure flag.</li>
                    <li className={cssns()}><strong>Size Limit:</strong> We can limit the session file's size with --sessionmaxsize flag, for example --sessionmaxsize=1073741824 to limit it to 2gb.</li>
                  </ul>
                </div>

                <h3 className={cssns()}>Considerations</h3>
                <div className={cssns("content cozy")}>
                  There are two drawbacks: space and performance. One also has to be careful with privacy when using this feature.
                </div>
                <div className={cssns("content cozy")}>
                  <strong>Space</strong>: These session files often take a surprisingly small amount of space, but sometimes they can get very large. Every nondeterministic operation is recorded, including network or file reads. If you read entire gigabytes from files or network, that's getting copied into the session file. Finding a 200gb session file might be quite a surprise. If you're reading massive amounts of data from files or network, it's recommended to get an external hard drive, or specify a filter to only record certain threads.
                </div>
                <div className={cssns("content cozy")}>
                  <strong>Performance</strong>: Writing to these files can use up CPU time. One might need a more powerful processor or graphics card to compensate for the CPU time this feature could use.
                </div>
                <div className={cssns("content cozy")}>
                  <strong>Privacy</strong>: These files are stored unencrypted by default, which could pose a privacy risk to the user. Make sure they are aware and understand that the program's inputs are being recorded. If there is any authentication in your app, then move the rest of your application to a different thread, and record that thread.
                </div>
              </div>

            </div>

            <div className={cssns("margin")}>

              <div className={cssns("notes-header")}>
                <NotesHeader update={this.updateNotesHeaderRect}/>
              </div>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="noteInstrument">
                "Instrumenting" a program means that when a compiler is generating the program, it will include special extra instructions.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="noteNondops">
                See <Link to="determinism">Determinism</Link> for a list of nondeterministic operations.
              </Note>

              <Note colorsAndPositions={this.state.noteColorsAndPositions} update={this.updateNoteSize} name="noteMessages">
                Remember that Radon threads can only share data by sending and receiving messages. With this feature, Radon just records those messages.
              </Note>

            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default Replayability;
