function request<TResponce>(): Promise<TResponce> {
  return fetch('fdsdsfsd')
    .then<TResponce>(res => res.json())
}

const value: unknown = {
  userName: 'name',
  avatarURL: 'avatar'
}

interface User {
  userName: string;
  avatarURL: string;
}

function isUser(value: unknown): value is User {
  return typeof value === 'object'
    && 'userName' in value
    && 'avatarURL' in value
}

if(isUser(value)) {
  console.log(value.userName)
}

