export interface Account {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    favoriteColor?: string;
    catchPhrase?: string;
    roles: Roles
}

export interface Roles { 
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
 }