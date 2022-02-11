/*
 *  Site-wide header component contains mainly the
 *  logo & user profile menu.
 *  Created On 08 February 2022
 */

import { ReactElement } from 'react';

export const Header = (): ReactElement => <header className="bg-blue-600 text-white py-6">
    <div className="container mx-auto flex justify-between items-center px-8">
        {/* brand */}
        <a href="/">
            <svg className="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1102.291 511.818">
                <path d="M166.994-92.7a136.82,136.82,0,0,1-53.248-10.594A144.672,144.672,0,0,1,68.3-133.4a144.672,144.672,0,0,1-30.109-45.442A136.821,136.821,0,0,1,27.6-232.091a136.821,136.821,0,0,1,10.594-53.249A144.672,144.672,0,0,1,68.3-330.782a144.672,144.672,0,0,1,45.442-30.109,136.822,136.822,0,0,1,53.248-10.594q46.836,0,83.636,27.879v-27.879h55.758V-92.7H250.63v-27.879Q213.83-92.7,166.994-92.7Zm0-55.758a82.453,82.453,0,0,0,42.1-11.152,82.193,82.193,0,0,0,30.388-30.388,82.453,82.453,0,0,0,11.152-42.1,82.453,82.453,0,0,0-11.152-42.1,82.193,82.193,0,0,0-30.388-30.388,82.453,82.453,0,0,0-42.1-11.152,82.453,82.453,0,0,0-42.1,11.152,82.192,82.192,0,0,0-30.388,30.388,82.453,82.453,0,0,0-11.152,42.1,82.453,82.453,0,0,0,11.152,42.1A82.192,82.192,0,0,0,124.9-159.606,82.453,82.453,0,0,0,166.994-148.455ZM456.933-92.7a65.964,65.964,0,0,1-31.782-7.806,75.115,75.115,0,0,1-25.091-22.3q-14.5-20.63-21.745-54.642a341.128,341.128,0,0,1-6.412-49.067q-1.394-24.533-1.394-53.527V-483h57.43v202.958q0,59.661,6.691,90.327,5.018,25.648,12.267,33.455a17.733,17.733,0,0,0,10.036,5.3,91.815,91.815,0,0,0,13.382.836V-92.7Zm66.352-278.788h55.758v27.879q36.8-27.879,83.636-27.879a136.821,136.821,0,0,1,53.249,10.594,144.674,144.674,0,0,1,45.442,30.109,144.673,144.673,0,0,1,30.109,45.442,136.822,136.822,0,0,1,10.594,53.249,136.822,136.822,0,0,1-10.594,53.249A144.673,144.673,0,0,1,761.37-133.4a144.674,144.674,0,0,1-45.442,30.109A136.821,136.821,0,0,1,662.679-92.7q-46.836,0-83.636-27.879V18.818H523.285Zm139.394,223.03a82.453,82.453,0,0,0,42.1-11.152,82.192,82.192,0,0,0,30.388-30.388,82.453,82.453,0,0,0,11.151-42.1,82.453,82.453,0,0,0-11.151-42.1,82.192,82.192,0,0,0-30.388-30.388,82.453,82.453,0,0,0-42.1-11.152,82.453,82.453,0,0,0-42.1,11.152,82.192,82.192,0,0,0-30.388,30.388,82.453,82.453,0,0,0-11.152,42.1,82.452,82.452,0,0,0,11.152,42.1,82.192,82.192,0,0,0,30.388,30.388A82.453,82.453,0,0,0,662.679-148.455ZM980.5-92.7a136.82,136.82,0,0,1-53.248-10.594A144.671,144.671,0,0,1,881.806-133.4,144.671,144.671,0,0,1,851.7-178.842,136.821,136.821,0,0,1,841.1-232.091,136.821,136.821,0,0,1,851.7-285.339a144.671,144.671,0,0,1,30.109-45.442,144.671,144.671,0,0,1,45.442-30.109A136.821,136.821,0,0,1,980.5-371.485q46.836,0,83.636,27.879v-27.879h55.758V-92.7h-55.758v-27.879Q1027.333-92.7,980.5-92.7Zm0-55.758a82.453,82.453,0,0,0,42.1-11.152,82.192,82.192,0,0,0,30.388-30.388,82.453,82.453,0,0,0,11.151-42.1,82.453,82.453,0,0,0-11.151-42.1,82.192,82.192,0,0,0-30.388-30.388,82.454,82.454,0,0,0-42.1-11.152,82.454,82.454,0,0,0-42.1,11.152,82.192,82.192,0,0,0-30.388,30.388,82.452,82.452,0,0,0-11.152,42.1,82.452,82.452,0,0,0,11.152,42.1A82.192,82.192,0,0,0,938.4-159.606,82.453,82.453,0,0,0,980.5-148.455Z" transform="translate(-22.6 488)" fill="currentColor" stroke="currentColor" strokeWidth="10"></path>
            </svg>
        </a>
    </div>
</header>
