const TIMER_DURATION = 30; // seconds

const FormPage = ({ setName }) => {
  const nameInputRef = React.useRef();
  const handleSubmit = React.useCallback((event) => {
    setName(nameInputRef.current.value);
    event.preventDefault();
  }, []);

  return (
    <>
      <p className="description">
        Enter your name below to find someone else looking to grab a coffee at
        Mintel London within the next 10 minutes!
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <div className="control">
            <input
              ref={nameInputRef}
              className="input"
              type="text"
              name="name"
              placeholder="Name"
            />
          </div>
        </div>
        <div className="field">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select>
                <option>Mintel House - Ground Floor</option>
              </select>
            </div>
          </div>
        </div>

        <div className="control">
          <button className="button is-black" type="submit">
            Grab a coffee now!
          </button>
        </div>
      </form>
    </>
  );
};

const useMatchFinder = (name, setMatch) => {
  const socket = React.useMemo(() => io(), []);
  React.useEffect(() => {
    socket.on("match", (match) => {
      setMatch(match);
    });
    socket.on("connect", () => {
      console.log("Connected!");
      socket.emit("join", name);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected!");
    });

    return () => {
      socket.disconnect();
      socket.off("match");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
};

const ClockPage = ({ name, setMatch }) => {
  useMatchFinder(name, setMatch);
  const [seconds, setSeconds] = React.useState(TIMER_DURATION);

  const tick = React.useCallback(() => {
    if (seconds > 0) {
      setSeconds((x) => x - 1);
    } else {
      setMatch(false);
    }
  }, [seconds, setSeconds]);

  React.useEffect(() => {
    const tickId = setInterval(tick, 1000);
    return () => {
      clearInterval(tickId);
    };
  }, [tick]);

  const progress = (1 - seconds / TIMER_DURATION) * 100;
  const formattedTime = `${Math.floor(seconds / 60)}:${String(
    seconds % 60
  ).padStart(2, "0")}`;

  return (
    <>
      <p className="description">
        Please wait whilst we match you with a coffee friend
      </p>
      <progress className="progress is-warning" value={progress} max="100">
        {progress}%
      </progress>
      <div id="timer">{formattedTime}</div>
    </>
  );
};

const MatchPage = ({ match }) => {
  React.useEffect(() => {
    new Notification(`GrabACoffee with ${match}`, {
      body: `Go grab a cofee ${match} at Mintel House - Ground Floor`,
      icon: "/static/assets/GrabACoffee_icon.png",
    });
  }, [match]);
  return (
    <div className="has-text-centered">
      <h3 className="subtitle is-6">Match found!</h3>
      <p className="description has-text-weight-bold">
        Meet {match} at Mintel House - Ground Floor
      </p>
    </div>
  );
};

const NoMatchPage = ({ setMatch }) => (
  <div className="has-text-centered">
    <h3 className="subtitle is-6 ">Sorry, we couldn't find you a match</h3>
    <p className="description has-text-weight-bold">
      Try grab a coffee again later!
    </p>
    <button className="button is-black" onClick={() => setMatch(undefined)}>
      Retry
    </button>
  </div>
);

const NotificationButton = () => {
  if (Notification.permission === "default") {
    return (
      <div>
        <button
          id="notifications-button"
          className="button is-small"
          onClick={() => Notification.requestPermission()}
        >
          Enable notifications
        </button>
      </div>
    );
  }
  return <></>;
};

const App = () => {
  const [name, setName] = React.useState();
  const [match, setMatch] = React.useState();
  return (
    <>
      {!name && <FormPage setName={setName} />}
      {name && match === undefined && (
        <ClockPage name={name} setMatch={setMatch} />
      )}
      {name && match === false && <NoMatchPage setMatch={setMatch} />}
      {name && match && <MatchPage match={match} />}
      <NotificationButton />
    </>
  );
};

const domContainer = document.querySelector("#app");
const root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(App));
