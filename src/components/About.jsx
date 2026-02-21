import { useState, useEffect } from 'react';
import { api } from '../api/service';
import LoadingSpinner from './LoadingSpinner';

export default function About() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.getProfile().then(setProfile).catch(() => setProfile({ about_text: '' }));
  }, []);

  if (!profile) {
    return (
      <section className="section about" id="about">
        <div className="container">
          <h2 className="section-title">About</h2>
          <LoadingSpinner message="Loading…" variant="section" />
        </div>
      </section>
    );
  }
  if (!profile.about_text?.trim()) return null;

  return (
    <section className="section about" id="about">
      <div className="container">
        <h2 className="section-title">About</h2>
        <div className="about-content">
          <p className="about-text">{profile.about_text}</p>
        </div>
      </div>
    </section>
  );
}
