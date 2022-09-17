const Handlebars = require('handlebars');

const galeryCard = `    
{{#each this}}
    <div class="photo-card">
    <a class="gallery__link" href={{largeImageURL}}>
      <img class="photo" src="{{webformatURL}}" alt="{{tags }}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes:<br>{{likes}}</b>
        </p>
        <p class="info-item">
          <b>Views:<br>{{views}}</b>
        </p>
        <p class="info-item">
          <b>Comments:<br>{{comments}}</b>
        </p>
        <p class="info-item">
          <b>Downloads:<br>{{downloads}}</b>
        </p>
      </div>
    </div>
{{/each}}`;

export const TEMPLATE = Handlebars.compile(galeryCard);
