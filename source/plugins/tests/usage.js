const { log } = require("../logger/index");

log("Info message", {
    header: "Info Header",
    type: "info",
});

log("Warning message", {
    header: "Warning Header",
    type: "warning",
});

log("Success message", {
    header: "Success Header",
    type: "success",
});

log("Error message", {
    header: "Error Header",
    type: "error",
});