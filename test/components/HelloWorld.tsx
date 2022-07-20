export const HelloWorld = ({ name = "World" }: { name?: string }) => {
    return <div>Hello {name}</div>;
};
