const handleGetAllUsers = (req, res) => {
    return res.status(200).send('Successfully invoked handleGetAllUsers method')
}

const handleGetUserById = (req, res) => {
    return res.status(200).send(`Successfully invoked handleGetUserById method with ID ${req.params.id}`)
}

const handleCreateNewUser = (req, res) => {
    return res.status(201).send(`Successfully created new user with ID`)
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleCreateNewUser
}