export enum MessageType {
    ADD = 'ADD',
    EDIT = 'EDIT',
    DELETE = 'DELETE'
}
export const Messages = {
    status: (module: string, type: MessageType): string => {
        if(type === MessageType.ADD) return `${module} has been created successfully`;
        if(type === MessageType.EDIT) return `${module} has been updated successfully`;
        if(type === MessageType.DELETE) return `${module} has been deleted successfully`;

        return '';
    },
    error: 'Something went wrong! Please try again later.',
}