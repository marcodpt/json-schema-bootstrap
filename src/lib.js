const copy = X => X !== undefined ? JSON.parse(JSON.stringify(X)) : X

export default {copy}
