import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
  return (
    <React.Fragment>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <div
            key={alert.id}
            style={{
              backgroundColor: "#ff9f43",
              color: "#333",
              padding: "1rem",
              marginTop: "1rem",
            }}
          >
            {alert.msg}
          </div>
        ))}
    </React.Fragment>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
