const defaultService = {
    getDefaultRole: () => {
        const defaultRole = localStorage.getItem('role');
        return defaultRole;
    }
}

export default defaultService;