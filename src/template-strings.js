const Handlebars = require('handlebars');

const galeryCard = `    
{{#each this}}
    <div class="photo-card">
      <img class="photo" src="{{webformatURL}}" alt="{{tags }}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes:{{likes}}</b>
        </p>
        <p class="info-item">
          <b>Views:{{views}}</b>
        </p>
        <p class="info-item">
          <b>Comments:{{comments}}</b>
        </p>
        <p class="info-item">
          <b>Downloads:{{downloads}}</b>
        </p>
      </div>
    </div>
{{/each}}`;

export const TEMPLATE = Handlebars.compile(galeryCard);

export const LAST_STRING = `        
<p class="info-item"> We're sorry, but you've reached the end of search results. </p>`;
