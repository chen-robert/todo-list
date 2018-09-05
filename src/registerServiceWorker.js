const unregister = () => navigator.serviceWorker.getRegistrations().then((registrations) => {
  for(let registration of registrations) {
    registration.unregister()
  }
});

export default unregister;