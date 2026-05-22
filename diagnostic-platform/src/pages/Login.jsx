<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value.trim())}
  placeholder="Technician Email"
  autoComplete="email"
  className="w-full bg-[#23232b] text-white p-5 rounded-2xl outline-none"
/>

<input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
  autoComplete="current-password"
  className="w-full bg-[#23232b] text-white p-5 rounded-2xl outline-none"
/>