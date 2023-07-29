module.exports.getTeamAcks = async function ({ client, guildId, userId }) {

    let guild = await client.guilds.cache.get(guildId);
    let user = await guild.members.cache.get(userId);

    /**
     * DEFINE TEAM ACKS
     */

    let teamAcks = [];
    
    let acksList = {
        owners: [],
        management: [],
        head_devs: [],
        head_managers: [],
        staff_managers: [],
        web_developers: [],
        lib_developers: [],
        web_moderators: [],
        sr_reviewer: [],
        jr_reviewer: [],
        support_team: []
    }

    /**
     * ASSIGN TEAM ACKS BASED ON USER ROLES
     */
    if (user && user.roles.cache.find((r) => r.name === 'Owner')) acksList.owners.push(userId);
    if (user && user.roles.cache.find((r) => r.name === 'Management')) acksList.management.push(userId);
    if (user && user.roles.cache.find((r) => r.name === 'Head Developer')) acksList.head_devs.push(userId);
    if (user && user.roles.cache.find((r) => r.name === 'Head Staff Managers')) acksList.head_managers.push(userId);
    if (user && user.roles.cache.find((r) => r.name === 'Staff Managers')) acksList.staff_managers.push(userId);
    if (user && user.roles.cache.find((r) => r.name === 'Website Developers')) acksList.web_developers.push(userId);
    if (user && user.roles.cache.find((r) => r.name === 'Library Developers')) acksList.lib_developers.push(userId);
    if (user && user.roles.cache.find((r) => r.name === 'Website Moderators')) acksList.web_moderators.push(userId);
    if (user && user.roles.cache.find((r) => r.name === 'Sr. Reviewer')) acksList.sr_reviewer.push(userId);
    if (user && user.roles.cache.find((r) => r.name === 'Jr. Reviewer')) acksList.jr_reviewer.push(userId);
    if (user && user.roles.cache.find((r) => r.name === 'Support Team')) acksList.support_team.push(userId);

    await console.log(`Added: ${userId} to their appropriate acks`);

    /**
     * ADD ARRAY OF USERS ACKS TO TEAM ACKS
     */
    if (acksList.owners.includes(userId)) teamAcks.push('Owner');
    if (acksList.management.includes(userId)) teamAcks.push('Management');
    if (acksList.head_devs.includes(userId)) teamAcks.push('Head Developer');
    if (acksList.head_managers.includes(userId)) teamAcks.push('Head Staff Manager');
    if (acksList.staff_managers.includes(userId)) teamAcks.push('Staff Manager');
    if (acksList.web_developers.includes(userId)) teamAcks.push('Website Developer');
    if (acksList.lib_developers.includes(userId)) teamAcks.push('Library Developer');
    if (acksList.web_moderators.includes(userId)) teamAcks.push('Website Moderator');
    if (acksList.sr_reviewer.includes(userId)) teamAcks.push('Senior Reviewer');
    if (acksList.jr_reviewer.includes(userId)) teamAcks.push('Junior Reviewer');
    if (acksList.support_team.includes(userId)) teamAcks.push('Support Team');

    await console.log(`Added: ${userId}'s acks to the teamAcks array`);

    if (!teamAcks || teamAcks == null || teamAcks == undefined) teamAcks = 'None'

    return teamAcks;
}