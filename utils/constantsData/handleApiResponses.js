export function handleRequestSuccess(res, data, successMessage) {
      return res.status(200).json({ success: true, data, message: successMessage });
}

export function handleRegisterSuccess(res, data, successMessage) {
      return res.status(201).json({ success: true, data, message: successMessage });
}
export function handleRequestSuccessNoContent(res, successMessage) {
      return res.status(204).json({ success: true, message: successMessage });
}

export function handleBadRequest(res, errorMessage) {
      return res.status(400).json({ success: false, error: errorMessage, });
}

export function handleDataNotFound(res, errorMessage) {
      return res.status(404).json({ success: false, error: errorMessage, });
}

export function handleMethodNotAllowed(res, errorMessage) {
      return res.status(405).json({ success: false, error: errorMessage, });
}

export function handleInternalServerError(res, errorMessage) {
      return res.status(500).json({ success: false, error: errorMessage, });
}
