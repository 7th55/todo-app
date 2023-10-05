// TODO: Генерировать уникальный идентификатор не на "Math.random".
export const createId = () => (Math.random() * 100000000000000000).toString();
