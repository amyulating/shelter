const {
    http: {intercept}
} = shelter




const unintercept = intercept("post", /\/channels\/\d+\/messages/, async (req, send) => {
    if (req.body.attachments) {
        for (let i = 0; i < req.body.attachments.length; i++) {
            req.body.attachments[i] = {
                ...req.body.attachments[i],
                is_remix: true
            };
        }
    }
    return send(req)
})

export function onUnload() {
    unintercept()
}