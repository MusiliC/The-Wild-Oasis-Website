import Counter from "../components/Counter";

async function Page() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  const data = await res.json();

  console.log(data);

  return <div>
    <h1>Cabin Users</h1>
    <ul>
      {
        data.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))
      }
    </ul>

    <Counter users = {data}/>
  </div>;
}

export default Page;
