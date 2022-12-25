const db = require("../../database/peatio_production");

module.exports = class Members {
    constructor(
        id,
        uid,
        email,
        level,
        role,
        group,
        state,
        created_at,
        updated_at
    ) {
        this.id = id;
        this.uid = uid;
        this.email = email;
        this.level = level;
        this.role = role;
        this.group = group;
        this.state = state;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static get_member_id(uid) {
        return db.execute("SELECT id, email FROM members WHERE uid = ?", [uid]);
    }

    static get_uid(member_id) {
        return db.execute("SELECT uid FROM members WHERE id = ?", [member_id]);
    }

};