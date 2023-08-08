const getDisplayName = (user: any) => {
    if (user === null || user === undefined) {
      return;
    }
    return user?.displayName.split(' ')[0];
}

export default getDisplayName;