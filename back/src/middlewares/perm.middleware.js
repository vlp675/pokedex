exports.fonction_to_use_in_router = (param) => {
    return (req, res, next) => {
        console.log(param);
        if (param.role != "USER")
            return next();
        else
            return res.status(403).send();
    };
};
